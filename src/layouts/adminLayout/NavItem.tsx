import NextLink from "next/link";
import { useRouter } from "next/router";
import { Box, Button, ListItem } from "@mui/material";
import { EmotionJSX } from "@emotion/react/types/jsx-namespace";

type Props = {
  href: string;
  icon: EmotionJSX.Element;
  title: string;
};

export const NavItem: React.FC<Props> = ({ href, title, icon }) => {
  const router = useRouter();
  const active = href ? router.pathname === href : false;

  return (
    <ListItem
      disableGutters
      sx={{
        display: "flex",
        mb: 0.5,
        py: 0,
        px: 2,
      }}
    >
      <NextLink href={href} passHref>
        <Button
          component="a"
          startIcon={icon}
          disableRipple
          sx={{
            backgroundColor: active ? "rgba(255,255,255, 0.08)" : "",
            borderRadius: 1,
            color: active ? "secondary.main" : "inherit",
            fontWeight: active ? "fontWeightBold" : "",
            justifyContent: "flex-start",
            px: 3,
            textAlign: "left",
            textTransform: "none",
            width: "100%",
            "& .MuiButton-startIcon": {
              color: active ? "secondary.main" : "neutral.400",
            },
            "&:hover": {
              backgroundColor: "rgba(255,255,255, 0.08)",
              color: "secondary.light",
            },
          }}
        >
          <Box sx={{ flexGrow: 1 }}>{title}</Box>
        </Button>
      </NextLink>
    </ListItem>
  );
};
