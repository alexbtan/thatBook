import Feed from '@components/Feed'

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        That
        <span className="brown_gradient text-center">Book</span>
      </h1>
      <p>
        Review share and get recommended for books!
      </p>

      <Feed />
    </section>
  )
}

export default Home