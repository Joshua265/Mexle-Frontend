import React, { useState, useEffect, useContext } from "react";
import { RootStoreContext } from "stores/RootStore";
import { Input, Slider, Grid, Typography } from "@material-ui/core";
import ImageUploader from "react-images-upload";
import { useTranslation } from "react-i18next";

interface IProps {
  content?: string;
  src?: string;
  imageId?: string;
  width?: string;
}

export const ImageToHtml = (props: IProps) => {
  const htmlString = `<figure id="${props.imageId}" ><img src="${props.src}" style="width:${props.width}%;display:block;margin-left:auto;margin-right:auto;" /><figcaption style="text-align:center;">${props.content}</figcaption></figure>`;
  return htmlString;
};

function valuetext(value: number) {
  return `${value}%`;
}

const Image = ({ props, id }) => {
  const { editorStore } = useContext(RootStoreContext);
  const { t } = useTranslation();
  const [data, setData] = useState(props.content || "");
  const [src, setSrc] = useState(props.src || "");
  const [imageId, setImageId] = useState(props.imageId || "");
  const [width, setWidth] = useState(props.width || 100);

  useEffect(() => {
    const currentProps: IProps = { content: data, src, imageId, width };
    editorStore.changeBlockProps(id, currentProps, ImageToHtml(currentProps));
  }, [data, src, imageId, width, editorStore, id]);

  const onDrop = async (pictureFiles, pictureDataURLs) => {
    setSrc(pictureDataURLs[0]);
  };

  return (
    <Grid style={{ margin: "8px" }} direction="row" container spacing={1}>
      <Grid item sm={6} md={6}>
        <ImageUploader
          withIcon
          singleImage
          label={t("maxFileSize")}
          labelStyles={{ color: "black" }}
          buttonText={t("chooseImage")}
          onChange={onDrop}
          imgExtension={[".jpg", ".png", ".jpeg", ".svg"]}
          maxFileSize={5242880}
        />
      </Grid>
      <Grid item sm={6} md={6}>
        <Input
          placeholder={t("caption")}
          value={data}
          fullWidth
          onChange={(e) => setData(e.target.value)}
        />
        <Input
          placeholder={t("id")}
          value={imageId}
          fullWidth
          onChange={(e) => setImageId(e.target.value)}
        />
        <Typography>{t("size")}</Typography>
        <Slider
          value={width}
          onChange={(e, v) => setWidth(v)}
          getAriaValueText={valuetext}
          valueLabelFormat={valuetext}
          aria-label="size"
          valueLabelDisplay="auto"
          step={1}
          min={1}
          max={100}
        />
      </Grid>
    </Grid>
  );
};

export default Image;
