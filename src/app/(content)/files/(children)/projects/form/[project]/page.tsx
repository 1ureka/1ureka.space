import { validateSession } from "@/auth";
import { delay } from "@/utils/server-utils";
import { notFound } from "next/navigation";
import Link from "next/link";

import { Box, Skeleton, Stack, TextField, Typography } from "@mui/material";
import { MenuItem as MuiMenuItem } from "@mui/material";
import Block from "@/components/Block";
import Form from "@/components/(files)/ExploreForm";
const MenuItem = MuiMenuItem as React.ElementType;

const allGroups = ["group1", "group2", "group3", "group4", "group5"];
const avalibleGroups = ["group1", "group2", "group3"];

async function getGroups() {
  await delay(Math.random() * 1000);
  return { allGroups, avalibleGroups };
}

async function getImageFieldsByGroup(group: string) {
  await delay(Math.random() * 1000);

  if (!group) return [];

  if (avalibleGroups.includes(group))
    return [
      { id: "image01Id", name: "image01", camera: 0, tag: "" },
      { id: "image02Id", name: "image02", camera: 0, tag: "" },
      { id: "image03Id", name: "image03", camera: 0, tag: "" },
    ];

  return [
    { id: "image01Id", name: "image01", camera: 0, tag: "tag01" },
    { id: "image02Id", name: "image02", camera: 2, tag: "tag02" },
    { id: "image03Id", name: "image03", camera: 2, tag: "tag03" },
  ];
}

export default async function Page({
  params,
}: {
  params: { project: string };
}) {
  await validateSession();

  const { avalibleGroups, allGroups } = await getGroups();
  let group: string | null = null;
  let isEdit = false;
  const { project } = params;

  if (project === "new") {
    group = "";
  } else {
    if (!allGroups.includes(project)) notFound();
    if (!avalibleGroups.includes(project)) isEdit = true;
    group = project;
  }

  const imageFields = await getImageFieldsByGroup(group);
  const defaultValues = { project: group, description: "", imageFields };

  return (
    <Block sx={{ gridArea: "content" }}>
      <Box sx={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 5 }}>
        <Stack gap={2} sx={{ minWidth: 350 }}>
          <Stack gap={1.5}>
            <Typography>Project Name: </Typography>

            <TextField
              variant="filled"
              label="Group"
              required={!isEdit}
              select={!isEdit}
              size="small"
              fullWidth
              helperText="A project is inherited from the group"
              defaultValue={group}
              disabled={isEdit}
            >
              {!isEdit &&
                avalibleGroups.map((g) => (
                  <MenuItem
                    key={g}
                    component={Link}
                    href={`/files/projects/form/${g}`}
                    value={g}
                  >
                    {g}
                  </MenuItem>
                ))}
            </TextField>
          </Stack>

          <Form defaultValues={defaultValues} />
        </Stack>

        <Stack
          sx={{ position: "sticky", top: 0, gap: 1, height: "fit-content" }}
        >
          <Typography variant="subtitle2">Cover Image: </Typography>

          <Box sx={{ width: 1, aspectRatio: 16 / 9 }}>
            <Skeleton
              animation="wave"
              variant="rounded"
              sx={{ width: 1, height: 1 }}
            />
          </Box>

          <Box
            id="form-submit"
            sx={{ display: "grid", justifyItems: "center", mt: 1 }}
          />
        </Stack>
      </Box>
    </Block>
  );
}
