export default function Blog({ blog }) {
  return (
    <li
      style={{ paddingBlock: "6px", borderTop: "1px solid #ccc" }}
    >{`${blog.title} - ${blog.author} - (${blog.url})`}</li>
  );
}
