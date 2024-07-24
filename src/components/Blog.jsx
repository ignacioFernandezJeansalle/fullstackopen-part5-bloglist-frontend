export default function Blog({ blog }) {
  return (
    <div>
      <hr />
      <p>{`${blog.title} - ${blog.author} - (${blog.url})`}</p>
    </div>
  );
}
