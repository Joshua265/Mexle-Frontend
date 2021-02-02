import React from "react";
import {
  GridList,
  GridListTile,
  GridListTileBar,
  Typography,
  Link as MuiLink,
} from "@material-ui/core";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

//icons
import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";
import SchoolIcon from "@material-ui/icons/School";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import InfoIcon from "@material-ui/icons/Info";
// import MiniLogo from "images/MiniLogo";

const cellHeight = 300;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      overflow: "hidden",
      backgroundAttachment: "fixed",
      background: "inherit",
      zIndex: 1,
      boxShadow: "0 0 1rem 0 rgba(0, 0, 0, .3)",
      "&:before": {
        content: "",
        position: "absolute",
        background: "inherit",
        zIndex: -1,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        boxShadow: "inset 0 0 2000px rgba(255, 255, 255, 1)",
        filter: "blur(20px)",
      },
    },
    gridList: {
      overflow: "hidden",
      width: cellHeight * 2 + 10,
      height: cellHeight * 2 + 10,
      maxWidth: "calc(100vw - 48px)",
      maxHeight: "calc(100vw - 48px)",
    },
    gridListTile: {
      "&:hover": {
        boxShadow: "inset 0 0 2000px rgba(255, 255, 255, .3)",
      },
    },
    icon: {
      width: cellHeight - 24,
      height: cellHeight - 24,
      maxWidth: "calc(50vw - 48px)",
      maxHeight: "calc(50vw - 48px)",
      marginLeft: 12,
      alignSelf: "center",
      color: "white",
      fill: "white",
      "&:hover": {
        margin: 0,
        width: cellHeight - 8,
        height: cellHeight - 8,
      },
    },
  })
);

const FeatureGrid = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <GridList cellHeight="auto" className={classes.gridList}>
        <GridListTile className={classes.gridListTile}>
          <MuiLink href="https://wiki.mexle.hs-heilbronn.de/start">
            <LocalLibraryIcon className={classes.icon} />
            <GridListTileBar
              title="Wiki"
              subtitle={<span>Infos zum Nachschlagen</span>}
            />
          </MuiLink>
        </GridListTile>
        <GridListTile className={classes.gridListTile}>
          <Link to="/courses" className="whiteLink">
            <SchoolIcon className={classes.icon} />
            <GridListTileBar
              title="Kurse"
              subtitle={<span>Spielerisch MINT lernen</span>}
            />
          </Link>
        </GridListTile>
        <GridListTile className={classes.gridListTile}>
          <Link to="/shop" className="whiteLink">
            <LocalMallIcon className={classes.icon} />
            <GridListTileBar
              title="Shop"
              subtitle={<span>Comming soon...</span>}
            />
          </Link>
        </GridListTile>
        <GridListTile className={classes.gridListTile}>
          <Link to="/about" className="whiteLink">
            <InfoIcon className={classes.icon} />
            <GridListTileBar
              title="Das Mexle"
              subtitle={<span>Unsere Vision</span>}
            />
          </Link>
        </GridListTile>
      </GridList>
    </div>
  );
};

export default FeatureGrid;
