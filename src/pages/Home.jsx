import Articles from "../components/Articles"
import Tutorials from "../components/Tutorials"
import Newsletter from "../components/Newsletter";

function Home(){
    return(
        <main>
            <Articles />
            <Tutorials/>
            <Newsletter />
        </main>
    );
}
 export default Home;