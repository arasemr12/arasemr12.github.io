import { useSelector } from "react-redux";
import Back from "./components/Back";

function More() {
  let user = useSelector(state => state.user).user;
  let repos = useSelector(state => state.user).repos;
  let loading = useSelector(state => state.user).loading;

  if(loading) return (
    <div className="fixed flex items-center justify-center w-full h-full z-50">
      <span className="block w-5 h-5 border-[1px] border-gray-600 border-t-gray-400 rounded-full animate-spin z-50"></span>
    </div>
  );

  return (
    <>
      <div className="lg:w-2/3 w-full h-full flex flex-col items-center p-4 gap-5 other_anim overflow-auto">
          <div className="w-full flex flex-col gap-1">
              <span className="text-2xl">Who I am?</span>
              <span>I am a self-taught web/desktop developer. I am also learning game/os development.</span>
          </div>
          <div className="w-full flex flex-col gap-1">
              <span className="text-2xl uppercase">My skills</span>
              <div className="w-full flex flex-row flex-wrap gap-5">
                <div className="skill">Html</div>
                <div className="skill">Css</div>
                <div className="skill">Javascript</div>
                <div className="skill">Node</div>
                <div className="skill">Typescript</div>
                <div className="skill">Nuxt</div>
                <div className="skill">Vue</div>
                <div className="skill">React</div>
                <div className="skill">Next</div>
                <div className="skill">Tailwind</div>
                <div className="skill">C++</div>
                <div className="skill">C</div>
                <div className="skill">GO</div>
              </div>
          </div>
          <div className="w-full flex flex-col gap-2 py-4">
              <span className="text-2xl">My open source projects.</span>
              <div className="w-full flex flex-col lg:flex-row flex-wrap gap-5">
                {repos.length < 1 ? (
                <span className="text-xl font-bold text-center w-full">
                  No repo!
                </span>) : (<></>)}
                  {repos.map((repo) => (
                      <a key={repo.id} href={repo.html_url} target="_blank" className="w-full lg:w-[45%] hover:scale-105 border-[1px] border-gray-700 duration-300 flex flex-col p-4 rounded-lg bg-gray-800">
                          <span>{repo.name}</span>
                          <span>{repo.description}</span>
                          <div className="w-full flex flex-row items-center gap-2">
                              <span><i className="fa-regular fa-star mr-1"></i>{repo.stargazers_count}</span>
                              <span><i className="fa-solid fa-code-fork mr-1"></i>{repo.forks_count}</span>
                              <span>{repo.language}</span>
                          </div>
                      </a>
                  ))}
              </div>
          </div>
      </div>
      <Back/>
    </>
  )
}

export default More;
