import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton } from "@mui/material";

interface MenuListItem {
  title: string;
  onClick: () => void;
}

interface MoreOptionsProps {
  MenuList: MenuListItem[];
}

export default function MoreOptions({ MenuList }: MoreOptionsProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{ color: "#000" }}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        sx={{ p: 0, m: 0 }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {MenuList.map((item, index) => (
          <MenuItem
            sx={{ height: 22, borderBottom: "1px solid #c1c5d0" }}
            key={index}
            onClick={() => {
              handleClose();
              item.onClick();
            }}
          >
            {item.title}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
