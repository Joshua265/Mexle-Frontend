import React from "react";
import {
  GridList,
  GridListTile,
  GridListTileBar,
  Typography,
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
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      overflow: "hidden",
      width: cellHeight * 2 + 10,
      height: cellHeight * 2 + 10,
    },
    gridListTile: {
      "&:hover": {
        backgroundColor: "#006A00",
      },
    },
    icon: {
      width: cellHeight - 24,
      height: cellHeight - 24,
      marginLeft: 12,
      alignSelf: "center",
      color: theme.palette.text.primary,
      fill: theme.palette.text.primary,
      "&:hover": {
        marginLeft: 4,
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
      <GridList cellHeight={cellHeight} className={classes.gridList}>
        <GridListTile className={classes.gridListTile}>
          <Link to="/wiki" className="whiteLink">
            <LocalLibraryIcon className={classes.icon} />
            <GridListTileBar
              title="Wiki"
              subtitle={<span>Infos zum Nachschlagen</span>}
            />
          </Link>
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
