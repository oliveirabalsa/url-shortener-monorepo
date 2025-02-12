import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import MyUrls from "./pages/MyUrls";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ProtectedRoute } from "@/components";
import { UserProvider } from "@/contexts/UserContext";
const queryClient = new QueryClient();
const App = () => {
  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Home />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/my-urls" element={<MyUrls />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </UserProvider>
  );
};
export default App;
