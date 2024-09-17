import style from "../(Loading)/page.module.css";

export default function Loading() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className={style.loader}></div>
    </div>
  );
}
