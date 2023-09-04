import AutoFixNormalIcon from "@mui/icons-material/AutoFixNormal";

export default function Home() {
  return (
    <>
      <main className="flex flex-col items-center justify-between p-24">
        <div>
          <p>Main page</p>
          <AutoFixNormalIcon sx={{color: "blueviolet"}}/>
        </div>
      </main>
    </>
  );
}
