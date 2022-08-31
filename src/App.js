// import Header from "./Components/Header";
// import Footer from "./Components/Footer";
import Main from "./Pages/Ptt";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

function App() {
  return (
    // min-h-screen
    <QueryClientProvider client={queryClient}>
      <div>
        {/* <Header title="Hot Article" /> */}
        <Main />
        {/* <Footer copyright="Guan Ting Liu" /> */}
      </div>
    </QueryClientProvider>
  );
}

export default App;
