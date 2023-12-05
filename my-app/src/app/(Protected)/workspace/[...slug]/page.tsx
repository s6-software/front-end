export default function Page({ params }) {
  console.log(params);
  return <p>Active workspace{params.workspaceId}</p>;
}
