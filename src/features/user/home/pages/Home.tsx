import Landing from './../components/Landing';
import NewArrivals from "../components/NewArrivals";
import OnSale from "../components/OnSale";
import TopSelling from "../components/TopSelling";

export default function Home() {
    return (
        <>
            <Landing />
            <NewArrivals />
            <TopSelling />
            <OnSale />
        </>
    );
}
