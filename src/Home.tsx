import Button from './componets/ui/Button'

const Home = () => {
  return (
        <div className="w-full h-screen">
      <div className="px-6 md:px-0 w-full h-full flex flex-col items-center justify-center gap-[0px] bg-gradient-to-b  from-indigo-200 to-indigo-400">
        <h1 className="text-[35px] font-bold text-center">
          Learn React Js For Creating
        </h1>
        <h1 className="text-[35px] font-bold text-indigo-700 text-center">
          SPA Web Applications and Projects.
        </h1>
        <p className="w-[90%] md:w-[40%] text-center my-5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic,
          provident adipisci? Iusto sapiente veniam obcaecati consequuntur qui,
          quae cumque esse! Vel..
        </p>
        <a href="#APP">
          {" "}
          <Button className="bg-indigo-700 hover:bg-indigo-900 transition-all duration-300 font-bold !w-[100px]">
            Show Now
          </Button>
        </a>
      </div>
    </div>
  )
}

export default Home