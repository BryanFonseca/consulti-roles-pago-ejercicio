import Header from "./Header";
import classes from "./Layout.module.css";

const Layout = (props) => {
  return (
    <article className={classes.layoutContainer}>
      <Header />
      <main className={classes.mainContainer}>{props.children}</main>
    </article>
  );
};

export default Layout;
