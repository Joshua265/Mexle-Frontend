import { Input } from "@material-ui/core";
import React, { useState, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";
import { RootStoreContext } from "stores/RootStore";

interface IProps {
  url?: string;
  caption?: string;
  videoId?: string;
}

interface IProviders {
  name: string;
  filter: RegExp;
  html(url: string): string;
}

const providers: IProviders[] = [
  {
    name: "youtube",
    filter: /((?:m\.)?youtube\.com\/watch\?v=([\w-]+))|((?:m\.)?youtube\.com\/v\/([\w-]+))|(youtube\.com\/embed\/([\w-]+))|(youtu\.be\/([\w-]+))/,
    html: (url) => `<iframe src="${url}" 
    style="width: 100%;" frameborder="0" allow="encrypted-media" allowfullscreen>
  </iframe>`,
  },
];

export const toHtml = (props: IProps) => {
  let htmlString = `<p>Provider is not supported</p>`;
  providers.forEach((prov) => {
    const matches = props.url?.match(prov.filter);
    console.log(matches);
    if (matches && matches.length > 0) {
      htmlString = `<figure id="${props.videoId}" class="${
        prov.name
      }">${prov.html(props.url || "")}<figcaption>${
        props.caption
      }</figcaption></figure>`;
    }
  });
  console.log(htmlString);
  return htmlString;
};

const Video = ({ props, id }) => {
  const { editorStore } = useContext(RootStoreContext);
  const { t } = useTranslation();
  const [url, setUrl] = useState(props.url || "");
  const [caption, setCaption] = useState(props.caption || "");
  const [videoId, setVideoId] = useState(props.id || "");

  useEffect(() => {
    const currentProps: IProps = { url: url, caption: caption };
    editorStore.changeBlockProps(id, currentProps, toHtml(currentProps));
  }, [url, caption, videoId, editorStore, id]);

  return (
    <>
      <Input
        fullWidth
        placeholder="URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <div>
        <Input
          fullWidth
          placeholder={t("caption")}
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <Input
          fullWidth
          placeholder={t("id")}
          value={videoId}
          onChange={(e) => setVideoId(e.target.value)}
        />
      </div>
    </>
  );
};

export default Video;
