import { validateSession } from "@/auth";
import { getAllGroups, getMetadataByGroup } from "@/data/metadata";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { Box, Skeleton, Stack, TextField, Typography } from "@mui/material";
import { MenuItem as MuiMenuItem } from "@mui/material";
const MenuItem = MuiMenuItem as React.ElementType;

import Block from "@/components/Block";
import Form from "@/components/(files)/ExploreForm";
import { BoxM, StackM } from "@/components/Motion";
import { createMotionVar } from "@/components/MotionProps";

export default async function Page({
  params,
}: {
  params: { project: string };
}) {
  await validateSession();

  const { avalibleGroups, allGroups } = await getAllGroups();
  let group: string | null = null;
  let isEdit = false;
  const project = decodeURIComponent(params.project);

  if (project === "new") {
    group = "";
  } else {
    if (!allGroups.includes(project)) notFound();
    if (!avalibleGroups.includes(project)) isEdit = true;
    group = project;
  }

  const result = await getMetadataByGroup(group);
  const imageFields = result.map(({ id, name, explore }) => ({
    metadataId: id,
    name,
    camera: explore?.camera ?? 0,
    tag: explore?.tag ?? "",
  }));

  const defaultValues = {
    project: group,
    description: result[0]?.explore?.detail ?? "",
    imageFields,
  };

  return (
    <Block sx={{ gridArea: "content" }}>
      <Box sx={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 5 }}>
        <StackM gap={2} sx={{ minWidth: 350 }} variants={createMotionVar()}>
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
              slotProps={{
                select: {
                  MenuProps: {
                    slotProps: { paper: { style: { maxHeight: 300 } } },
                  },
                },
              }}
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
        </StackM>

        <Stack
          sx={{ position: "sticky", top: 0, gap: 1, height: "fit-content" }}
        >
          <BoxM variants={createMotionVar()}>
            <Typography variant="subtitle1">Cover Image: </Typography>
            <Typography variant="caption">
              (the first image order by name in the group)
            </Typography>
          </BoxM>

          <BoxM
            variants={createMotionVar({ from: { y: 0 } })}
            sx={{
              position: "relative",
              width: 1,
              aspectRatio: 16 / 9,
              borderRadius: 2,
              overflow: "clip",
            }}
          >
            <Skeleton
              animation="wave"
              variant="rectangular"
              sx={{ width: 1, height: 1 }}
            />
            {imageFields[0]?.metadataId && (
              <Image
                src={`/api/image/${imageFields[0]?.metadataId}/origin`}
                alt={imageFields[0]?.name}
                fill
                unoptimized
              />
            )}
          </BoxM>

          <BoxM
            variants={createMotionVar()}
            id="form-submit"
            sx={{ display: "grid", justifyItems: "center", mt: 1 }}
          />
        </Stack>
      </Box>
    </Block>
  );
}
