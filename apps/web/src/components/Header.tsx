import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useUser } from "@/hooks/useUser";

export const Header = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const handleLogout = () => {
    Cookies.remove("accessToken");
    setUser(null);
    navigate("/");
  };
  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full bg-white shadow"
    >
      <section className="max-w-screen-2xl mx-auto w-full flex items-center justify-between p-4">
        <NavigationMenu>
          <NavigationMenuList className="flex space-x-4">
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/">Home</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/my-urls">My URLs</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={handleLogout}>
            Log out
          </Button>
          <Avatar>
            <AvatarImage
              src="https://via.placeholder.com/40"
              alt="User Avatar"
            />
            <AvatarFallback>
              {user?.name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
      </section>
    </motion.header>
  );
};
