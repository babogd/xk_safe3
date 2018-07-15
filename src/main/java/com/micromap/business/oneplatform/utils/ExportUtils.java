package com.micromap.business.oneplatform.utils;

import cn.afterturn.easypoi.excel.ExcelExportUtil;
import cn.afterturn.easypoi.excel.entity.ExportParams;
import cn.afterturn.easypoi.excel.entity.enmus.ExcelType;
import org.apache.poi.ss.usermodel.ClientAnchor;
import org.apache.poi.ss.usermodel.Drawing;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFClientAnchor;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.http.ResponseEntity;

import javax.annotation.Nonnull;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.Base64;
import java.util.Collection;
import java.util.Objects;

import static com.micromap.business.oneplatform.utils.ApiResult.fail;
import static org.springframework.http.HttpHeaders.CONTENT_DISPOSITION;
import static org.springframework.http.HttpHeaders.CONTENT_LENGTH;
import static org.springframework.http.MediaType.APPLICATION_OCTET_STREAM;
import static org.springframework.http.ResponseEntity.ok;

/**
 * @author limeng 2018/7/7
 */
public class ExportUtils {

    public static <T, D> ResponseEntity export(Param<T, D> param, Class<T> tClass) {
        Objects.requireNonNull(param.getType());
        Objects.requireNonNull(param.getImgData());
        Objects.requireNonNull(param.getForm());
        Objects.requireNonNull(param.getTitle());
        Objects.requireNonNull(param.getExcelDtoMapper());
        final ExportType type = resolveType(param.getType());
        switch (type) {
            case NONE:
                return fail("提供的参数有误！");
            case CHART:
                try {
                    return getChartResponse(param);
                } catch (UnsupportedEncodingException e) {
                    e.printStackTrace();
                    return fail("文件名格式有误，导出失败！");
                }
            case TABLE:
                return getTableResponse(param, tClass);
            case ALL:
                try {
                    return getChartTableResponse(param, tClass);
                } catch (UnsupportedEncodingException e) {
                    e.printStackTrace();
                    return fail("文件名格式有误，导出失败！");
                }
            default:
                return fail("导出失败！");
        }
    }

    @Nonnull
    private static <T, D> ResponseEntity getChartTableResponse(Param<T, D> param, Class<T> tClass) throws UnsupportedEncodingException {
        final byte[] imageBytes = base64ToImageBytes(param.getImgData());

        final short titleHeight = (short) 100;//图片高度，图片宽度为所有列的宽度和
        final ExportParams exportParams = new ExportParams(param.getTitle(), param.getTitle(), ExcelType.XSSF);
        exportParams.setSecondTitle("");
        exportParams.setSecondTitleHeight(titleHeight);
        try (final Workbook workbook = ExcelExportUtil.exportExcel(
                exportParams, tClass, param.getExcelDtoMapper().map(param.getForm()));
             ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {
            final Sheet sheet1 = workbook.getSheetAt(0);//获取第一个sheet
            final int columnNum = param.getColumnNum();//列数，根据字段数量填写，用于计算图片宽度（必须）
            final int titleWidth = sheet1.getColumnWidth(0) * columnNum / 256;//计算所有列数的总长度
            final Drawing chartImage = sheet1.createDrawingPatriarch();
            // XSSFClientAnchor(dx1,dy1,dx2,dy2,col1,row1,col2,row2)的参数，有必要在这里说明一下：
            // dx1：起始单元格的x偏移量，采用0即可
            // dy1：起始单元格的y偏移量，采用0即可
            // dx2：终止单元格的x偏移量，即为宽度
            // dy2：终止单元格的y偏移量，即为高度
            // col1：起始单元格列序号，从0开始计算；
            // row1：起始单元格行序号，从0开始计算，
            // col2：终止单元格列序号，从0开始计算；
            // row2：终止单元格行序号，从0开始计算，
            final ClientAnchor anchor = new XSSFClientAnchor(0, 0,
                    titleWidth, titleHeight, (short) 0, 1, (short) columnNum, 2);
            final int pictureIndex = workbook.addPicture(imageBytes, XSSFWorkbook.PICTURE_TYPE_PNG);//添加图片到workbook
            chartImage.createPicture(anchor, pictureIndex);//根据坐标设置图片位置
            workbook.write(outputStream);
            final String fileName = URLEncoder.encode(param.getTitle() + ".xlsx", "UTF-8");//防止文件名乱码
            final byte[] bytes = outputStream.toByteArray();
            final int size = outputStream.size();
            return ok().contentType(APPLICATION_OCTET_STREAM)
                    .header(CONTENT_DISPOSITION, "attachment; filename=\"" + fileName + "\"")
                    .header(CONTENT_LENGTH, "" + size)
                    .body(bytes);
        } catch (IOException ex) {
            ex.printStackTrace();
            return fail("导出失败！");
        }
    }

    @Nonnull
    private static <T, D> ResponseEntity getTableResponse(Param<T, D> param, Class<T> tClass) {
        final ExportParams exportParams = new ExportParams(param.getTitle(), param.getTitle(), ExcelType.XSSF);
        try (final Workbook workbook = ExcelExportUtil.exportExcel(
                exportParams, tClass, param.getExcelDtoMapper().map(param.getForm()));
             final ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {
            workbook.write(outputStream);
            final String fileName = URLEncoder.encode(param.getTitle() + ".xlsx", "UTF-8");//防止文件名乱码
            final byte[] bytes = outputStream.toByteArray();
            final int size = outputStream.size();
            return ok().contentType(APPLICATION_OCTET_STREAM)
                    .header(CONTENT_DISPOSITION, "attachment; filename=\"" + fileName + "\"")
                    .header(CONTENT_LENGTH, "" + size)
                    .body(bytes);
        } catch (IOException ex) {
            ex.printStackTrace();
            return fail("导出失败！");
        }
    }

    @Nonnull
    private static <T, D> ResponseEntity getChartResponse(Param<T, D> param) throws UnsupportedEncodingException {
        final byte[] imageBytes = base64ToImageBytes(param.getImgData());
        final String fileName = URLEncoder.encode(param.getTitle() + ".png", "UTF-8");//防止文件名乱码
        final int size = imageBytes.length;
        return ok().contentType(APPLICATION_OCTET_STREAM)
                .header(CONTENT_DISPOSITION, "attachment; filename=\"" + fileName + "\"")
                .header(CONTENT_LENGTH, "" + size)
                .body(imageBytes);
    }

    /**
     * base64字符串转化为图片byte数组
     *
     * @param base64Str base64格式字符串
     * @return 图片byte数组
     * @throws UnsupportedEncodingException 不支持的编码格式
     */
    private static byte[] base64ToImageBytes(String base64Str) throws UnsupportedEncodingException {
        final String base64 = base64Str.split("base64,")[1];
        return Base64.getDecoder().decode(base64.getBytes("UTF-8"));
    }

    /**
     * 根据type内的参数值返回要导出的类型
     *
     * @param type 类型数组
     * @return 导出类型标识
     */
    private static ExportType resolveType(int[] type) {
        if (type.length == 0) {
            return ExportType.NONE;
        }
        if (type.length == 1) {
            if (type[0] == 0) {
                return ExportType.TABLE;
            } else if (type[0] == 1) {
                return ExportType.CHART;
            } else {
                return ExportType.NONE;
            }
        } else if (type.length == 2) {
            if ((type[0] == 0 && type[1] == 1) || (type[0] == 1 && type[1] == 0)) {
                return ExportType.ALL;
            } else {
                return ExportType.NONE;
            }
        }
        return ExportType.NONE;
    }

    /**
     * 普通pojo类型转换成ExcelDto
     *
     * @param <T> ExcelDto
     * @param <D> 普通pojo
     */
    public interface ExcelDtoMapper<T, D> {
        Collection<T> map(D form);
    }

    /**
     * 导出所需参数
     *
     * @param <T> ExcelDto
     * @param <D> 普通pojo
     */
    public static class Param<T, D> {
        /**
         * 前台图片base64字符串
         */
        private final String imgData;
        /**
         * Excel标题、文件名、sheet名称
         */
        private final String title;
        /**
         * 要导出的图表类型（1图，0表）
         */
        private final int[] type;
        /**
         * 导出字段列数，用以计算图片宽度
         */
        private final int columnNum;
        /**
         * 表单参数
         */
        private final D form;
        /**
         * 普通pojo类型转换成ExcelDto
         */
        private final ExcelDtoMapper<T, D> excelDtoMapper;

        public Param(@Nonnull String imgData
                , @Nonnull String title
                , int[] type
                , int columnNum
                , @Nonnull D form
                , @Nonnull ExcelDtoMapper<T, D> excelDtoMapper) {
            this.imgData = imgData;
            this.title = title;
            this.type = type;
            this.columnNum = columnNum;
            this.form = form;
            this.excelDtoMapper = excelDtoMapper;
        }

        public String getImgData() {
            return imgData;
        }

        public String getTitle() {
            return title;
        }

        public int[] getType() {
            return type;
        }

        public int getColumnNum() {
            return columnNum;
        }

        public D getForm() {
            return form;
        }

        public ExcelDtoMapper<T, D> getExcelDtoMapper() {
            return excelDtoMapper;
        }
    }

    /**
     * 导出类型
     */
    public enum ExportType {
        NONE(0),
        CHART(1),
        TABLE(2),
        ALL(3);
        public final int value;

        ExportType(int value) {
            this.value = value;
        }
    }
}
