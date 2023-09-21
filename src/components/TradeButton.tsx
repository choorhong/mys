import * as React from "react";
import Button from "@mui/material/Button";
import TradeDialog from "./TradeDialog";

// type PropType = {
//   children?: React.ReactNode;
// };

const TradeButton = () => {
  const [visible, setVisible] = React.useState(false);

  const handleToggleVisibility = React.useCallback(() => {
    setVisible((prevState) => !prevState);
  }, []);

  return (
    <div>
      <Button
        variant="contained"
        onClick={handleToggleVisibility}
        sx={{ position: "fixed", right: "1rem", bottom: "1rem" }}
      >
        Trade
      </Button>
      <TradeDialog
        visible={visible}
        onToggleVisibility={handleToggleVisibility}
      />
    </div>
  );
};

export default TradeButton;
