"use client";

import { useEffect, useRef, useState } from "react";
import Link, { type LinkProps } from "next/link";

import { Button, IconButton, Dialog, Divider, Box } from "@mui/material";
import { Typography, Stack, Skeleton } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import { BoxM, DialogTitleM, StackM } from "@/components/Motion";
import { DialogActionsM, DialogContentM } from "@/components/Motion";
import { verifyIntegrity } from "@/utils/server-actions";
import toast from "react-hot-toast";

interface VerifyFormProps {
  open: boolean;
  closeHref: LinkProps["href"];
}

type VerifyResult = { category: string; thumbnail: string; origin: string };
type VerifySummary = { total: string; scene: string; props: string };

export default function VerifyForm({ open, closeHref }: VerifyFormProps) {
  const thread = useRef(false);
  const [isVerifying, setVerifying] = useState(true);
  const [verifyTime, setVerifyTime] = useState<Date | null>(null);

  const [summary, setSummary] = useState<VerifySummary | null>(null);
  const [result, setResult] = useState<VerifyResult | null>(null);

  const handleVerify = async () => {
    if (thread.current) return;
    thread.current = true;
    setVerifying(true);
    setResult(null);
    setSummary(null);

    try {
      const res = await verifyIntegrity();

      if (!res.success) {
        res.error.forEach((message) => toast.error(message));
        return;
      }

      const {
        summary: { scene, props },
        ...result
      } = res.success;

      const summary = {
        scene: (scene / 1024 / 1024).toFixed(2),
        props: (props / 1024 / 1024).toFixed(2),
        total: ((scene + props) / 1024 / 1024).toFixed(2),
      };

      setResult(result);
      setSummary(summary);
      setVerifyTime(new Date());
    } catch {
      toast.error("Something went wrong");
    } finally {
      setVerifying(false);
      thread.current = false;
    }
  };

  useEffect(() => {
    if (open) handleVerify();
  }, [open]);

  return (
    <Dialog fullWidth open={open} PaperProps={{ sx: { overflow: "hidden" } }}>
      <DialogTitleM layout>Verify Integrity</DialogTitleM>

      <BoxM layout sx={{ position: "absolute", inset: "0 0 auto auto" }}>
        <Link href={closeHref}>
          <IconButton sx={{ mt: 1.5, mr: 1.5 }}>
            <CloseRoundedIcon fontSize="small" sx={{ color: "grey.500" }} />
          </IconButton>
        </Link>
      </BoxM>

      <DialogContentM
        sx={{ display: "grid", gap: 4, scrollbarGutter: "stable both-edges" }}
        dividers
        layout
      >
        <VerifyField
          title="Incorrect category"
          status={result && result.category}
        />
        <VerifyField
          title="Missing thumbnail"
          status={result && result.thumbnail}
        />
        <VerifyField title="Missing origin" status={result && result.origin} />

        {summary && <SummaryTable summary={summary} />}
      </DialogContentM>

      <DialogActionsM layout sx={{ justifyContent: "space-between" }}>
        <Typography variant="body2" sx={{ p: 1 }}>
          {verifyTime
            ? `Last verified at ${verifyTime.toLocaleTimeString()}`
            : "Not verified yet"}
        </Typography>

        <Button disabled={isVerifying} onClick={handleVerify}>
          Retry
        </Button>
      </DialogActionsM>
    </Dialog>
  );
}

function VerifyField({
  title,
  status,
}: {
  title: string;
  status?: string | null;
}) {
  return (
    <StackM layout spacing={4} alignItems="center" direction="row">
      <Typography>{title}</Typography>

      <Box sx={{ flexGrow: 1, border: "1px dashed gray" }} />

      {status ? (
        <Typography color={status === "PASS" ? "success.main" : "error.main"}>
          {status}
        </Typography>
      ) : (
        <Skeleton>
          <Typography>PASS</Typography>
        </Skeleton>
      )}
    </StackM>
  );
}

function SummaryTable({ summary }: { summary: VerifySummary }) {
  return (
    <StackM layout spacing={1}>
      <Typography gutterBottom>Summary</Typography>

      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="body2">Scene</Typography>
        <Typography variant="subtitle1">{summary.scene} MB</Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="body2">Props</Typography>
        <Typography variant="subtitle1">{summary.props} MB</Typography>
      </Stack>

      <Divider />

      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="body2">ALL</Typography>
        <Typography variant="subtitle1">{summary.total} MB</Typography>
      </Stack>
    </StackM>
  );
}
