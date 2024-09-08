"use client";

import toast from "react-hot-toast";
import { useMemo, useState, useTransition } from "react";
import type { ExploreMetadata } from "@/data/type";
import { comparator } from "@/utils/utils";
import { deleteProject } from "@/utils/server-actions";

import { Menu, MenuItem, IconButton } from "@mui/material";
import { TableHead, TableSortLabel } from "@mui/material";
import { Table, TableCell, TableContainer } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { BoxM, TableBodyM, TableRowM } from "@/components/Motion";
import { TablePaginationM } from "@/components/Motion";
import { createMotionVar } from "@/components/MotionProps";

type MetadataList = (ExploreMetadata & { group: string })[];
type TableCol = "project" | "camera" | "tag" | "detail";
const rowCells: { id: TableCol; label: string; align: "left" | "right" }[] = [
  { id: "project", label: "Project (group)", align: "left" },
  { id: "tag", label: "Tag", align: "right" },
  { id: "camera", label: "Camera", align: "right" },
  { id: "detail", label: "Description", align: "right" },
] as const;

const createLabel = (id: TableCol, value: string | number) => {
  if (typeof value === "number") return `Cam ${value + 1}`;

  // truncate description ，保留前6個word，後面用...代替
  if (id === "detail") {
    const list = value.split(" ").slice(0, 2);
    if (list.length < 2) return value;
    return `${list.join(" ")}...`;
  }

  return value;
};

export default function FileTable({ list }: { list: MetadataList }) {
  // Table
  const { SortLabelProps, PaginationProps, rows } = useTable(list);
  const variants = {
    animate: {
      transition: { staggerChildren: 1 / (3 * rows.length) },
    },
  };

  // Menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [link, setLink] = useState("");
  const open = Boolean(anchorEl);
  const handleClose = () => setAnchorEl(null);

  // Delete Action
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const handleDelete = async () => {
    startTransition(async () => {
      const errors = await deleteProject(link);
      if (errors) errors.error.forEach((error) => toast.error(error));
      handleClose();
      router.refresh();
      toast.success(`Project ${link} has been deleted.`);
    });
  };

  return (
    <BoxM variants={createMotionVar({ from: { y: 0 } })}>
      <TableContainer>
        <Table sx={{ minWidth: 300, overflow: "hidden" }}>
          <TableHead>
            <TableRowM variants={createMotionVar()}>
              {rowCells.map(({ id, label, align }) => (
                <TableCell key={id} align={align}>
                  <TableSortLabel {...SortLabelProps(id)} disabled={isPending}>
                    {label}
                  </TableSortLabel>
                </TableCell>
              ))}

              <TableCell align={"right"}>Actions</TableCell>
            </TableRowM>
          </TableHead>

          <TableBodyM key={JSON.stringify(rows)} variants={variants}>
            {rows.map((row) => {
              const key = JSON.stringify(row);
              const variants = createMotionVar({
                from: { y: 0, x: 65, scale: 1 },
              });

              return (
                <TableRowM key={key} variants={variants} hover tabIndex={-1}>
                  {rowCells.map(({ id, align }) => (
                    <TableCell key={id} align={align}>
                      {createLabel(id, row[id])}
                    </TableCell>
                  ))}

                  <TableCell padding="checkbox" align="right">
                    <IconButton
                      sx={{ mr: 1 }}
                      disabled={isPending}
                      onClick={(e) => {
                        setAnchorEl(e.currentTarget);
                        setLink(row.project);
                      }}
                    >
                      <MoreVertIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRowM>
              );
            })}
          </TableBodyM>
        </Table>
      </TableContainer>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        autoFocus={false}
      >
        <MenuItem
          dense
          sx={{ px: 1.5, gap: 1 }}
          component={Link}
          href={`/files/projects/form/${link}`}
          disabled={isPending}
        >
          <EditRoundedIcon fontSize="small" /> Edit
        </MenuItem>
        <MenuItem
          dense
          sx={{ px: 1.5, gap: 1, color: "error.main" }}
          onClick={handleDelete}
          disabled={isPending}
        >
          <DeleteRoundedIcon fontSize="small" /> Delete
        </MenuItem>
      </Menu>

      <TablePaginationM
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        showFirstButton
        showLastButton
        {...PaginationProps}
        layout
      />
    </BoxM>
  );
}

const useTable = (metadataList: MetadataList) => {
  // head
  const [order, setOrder] = useState<"desc" | "asc">("asc");
  const [orderBy, setOrderBy] = useState<TableCol>("project");

  const createSortHandler = (column: TableCol) => () => {
    const isAsc = orderBy === column && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(column);
  };

  const SortLabelProps = (id: TableCol) => ({
    onClick: createSortHandler(id),
    active: orderBy === id,
    direction: orderBy === id ? order : "asc",
  });

  // pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setPerPage] = useState(5);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const PaginationProps = {
    count: metadataList.length,
    page,
    rowsPerPage,
    onPageChange: handleChangePage,
    onRowsPerPageChange: handleChangeRowsPerPage,
  };

  // body
  const rows = useMemo(
    () =>
      metadataList
        .map(({ group, camera, tag, detail }) => ({
          project: group,
          camera,
          tag,
          detail,
        }))
        .toSorted(comparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [metadataList, order, orderBy, page, rowsPerPage]
  );

  return { SortLabelProps, PaginationProps, rows };
};
