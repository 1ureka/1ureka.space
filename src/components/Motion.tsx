"use client";

import { motion } from "framer-motion";
import {
  Box,
  Grid,
  ListItem,
  Paper,
  Stack,
  TableBody,
  TableRow,
  Alert,
  Divider,
  IconButton,
  ButtonBase,
  Skeleton,
  Typography,
  Button,
  TableCell,
  TablePagination,
  DialogContent,
  DialogActions,
  DialogTitle,
} from "@mui/material";
import type { TablePaginationProps } from "@mui/material";

// layout
export const BoxM = motion(Box);
export const PaperM = motion(Paper);
export const StackM = motion(Stack);
export const GridM = motion(Grid);

// button
export const IconButtonM = motion(IconButton);
export const ButtonBaseM = motion(ButtonBase);
export const ButtonM = motion(Button);

// misc
export const DividerM = motion(Divider);
export const AlertM = motion(Alert);
export const SkeletonM = motion(Skeleton);
export const TypographyM = motion(Typography);
export const ListItemM = motion(ListItem);

// table
export const TableRowM = motion(TableRow);
export const TableBodyM = motion(TableBody);
export const TableCellM = motion(TableCell);
export const TablePaginationM = motion(TablePagination) as (
  props: TablePaginationProps & { layout: boolean }
) => React.ReactNode;

// dialog
export const DialogContentM = motion(DialogContent);
export const DialogActionsM = motion(DialogActions);
export const DialogTitleM = motion(DialogTitle);
