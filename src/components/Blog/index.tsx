import Articles from '../Articles'

const Blog = () => {
  return (
    <div className="flex flex-col lg:flex-row mx-auto xxl:max-w-desktop lg:max-w-desktop max-w-mobile mb-8 lg:gap-8 gap-6">
      <Articles />
      <Articles />
      <Articles />
    </div>
  )
}

export default Blog
