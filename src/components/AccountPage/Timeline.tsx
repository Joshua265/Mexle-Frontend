import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Backdrop,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@material-ui/core";
import { useTranslation } from "react-i18next";
import moment from "moment";
import webServiceProvider from "helpers/webServiceProvider";

interface Column {
  id: "time" | "type" | "name";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: string) => string;
}

interface Data {
  time: string;
  type: string;
  name: number;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    margin: theme.spacing(2),
  },
  container: {
    height: 702,
  },
  title: {
    margin: theme.spacing(2),
  },
}));

export default function Timeline() {
  const { t } = useTranslation();

  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState<Array<Data>>([]);

  useEffect(() => {
    fetchRows();
  }, []);

  const fetchRows = async () => {
    const data = await webServiceProvider.get("user/history");
    setRows(data.history);
  };

  const columns: Column[] = [
    {
      id: "time",
      label: t("time"),
      minWidth: 170,
      format: (value: string) =>
        moment(value).format("MMMM Do YYYY, h:mm:ss a"),
    },
    { id: "type", label: t("type"), minWidth: 100 },
    {
      id: "name",
      label: t("name"),
      minWidth: 170,
      align: "right",
    },
  ];

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (rows) {
    return (
      <Paper className={classes.root}>
        <Typography variant="h4" component="h5" className={classes.title}>
          {t("history")}
        </Typography>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows!
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.time}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "string"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows!.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
  return <Backdrop open />;
}
