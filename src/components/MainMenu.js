import {
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Button,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

const MainMenu = () => {
  return (
    <Flex
      as="nav"
      maxW="1100px"
      w="100%"
      mx="auto"
      p={4}
      justifyContent="flex-end"
    >
      <Menu placement="bottom-end">
        <MenuButton size={"sm"} as={Button} rightIcon={<ChevronDownIcon />}>
          Connect
        </MenuButton>
        <MenuList>
          <MenuItem as={Link} to="/">
            Home
          </MenuItem>
          <MenuDivider />
          <MenuItem as="a" href="https://twitter.com/marcfromrivr" isExternal>
            Twitter
          </MenuItem>
          <MenuItem as="a" href="https://twitch.tv/marcfromrivr" isExternal>
            Twitch
          </MenuItem>
          <MenuItem
            as="a"
            href="https://www.linkedin.com/in/msinger1/"
            isExternal
          >
            LinkedIn
          </MenuItem>
          <MenuDivider />
          <MenuItem as="a" href="mailto:marc@rivr.stream" isExternal>
            Email
          </MenuItem>
          <MenuDivider />
          <MenuItem as={Link} to="/privacy-policies">
            Privacy Policies
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default MainMenu;
