import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

import TradeForm from "./Form/TradeForm";
import { ProfileShareContext } from "../context/profile-share";
import Checkout from "./Checkout";
import { ShareInfoType } from "../interfaces";
import { useParams } from "react-router-dom";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type PropType = {
  children?: React.ReactNode;
  visible: boolean;
  onToggleVisibility: (e: any) => void;
};

export default function TradeDialog(props: PropType) {
  const { ticker } = useParams();

  const [state, setState] = useState<{
    result: ShareInfoType;
  }>();
  console.log("state", state);
  const profileShareContext = useContext(ProfileShareContext);
  const { visible, onToggleVisibility } = props;

  const [step, setStep] = useState<string>();

  useEffect(() => {
    (async () => {
      const response = await fetch(`http://localhost:8080/${ticker}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseBody = await response.json();

      setState(responseBody);
    })();
  }, [ticker]);

  const handleNextStep = useCallback(
    (obj: { purchase: boolean; costOfTransaction: number } | string) => {
      if (typeof obj === "string" && obj === "back") {
        setStep("");
        return;
      }

      const { purchase, costOfTransaction } = obj as {
        purchase: boolean;
        costOfTransaction: number;
      };

      // if purchase & enough balance
      if (
        (purchase && profileShareContext.balance > costOfTransaction) ||
        !purchase
      ) {
        // go to checkOut component
        setStep("checkOut");
      }

      // if purchase & not enough balance
      if (purchase && profileShareContext.balance < costOfTransaction) {
        // go to top up component
        setStep("topUp");
      }
    },
    [profileShareContext.balance]
  );

  const component = useMemo(() => {
    if (step === "checkOut") {
      return (
        <Checkout
          onHandleNextStep={handleNextStep}
          items={state?.result?.data}
        />
      );
    }

    if (step === "topUp") {
      return <>Top up</>;
    }

    return (
      <TradeForm
        onHandleNextStep={handleNextStep}
        items={state?.result?.data}
      />
    );
  }, [step, handleNextStep, state?.result?.data]);

  return (
    <div>
      <Dialog
        fullScreen
        open={visible}
        onClose={onToggleVisibility}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={onToggleVisibility}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Close
            </Typography>
          </Toolbar>
        </AppBar>
        <div style={{ margin: "1rem 0" }}>{component}</div>
      </Dialog>
    </div>
  );
}
