import NewEditor from "./Editor";
export default function Home({ params }: any) {
  return (
    <div className="bg-white flex w-full h-view">
      <div className="flex bg-gray-100 w-3/5 mx-auto justify-center">
        <div className="w-full h-screen my-auto overflow-y-auto overflow-x-hidden ml-auto">
          <NewEditor />
        </div>
      </div>
    </div>
  );
}
