import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LoadingBar from "react-top-loading-bar";
import { Link } from "react-router-dom";

function More() {
  let user = useSelector(state => state.user);
  let repos = user.repos;
  user = user.user;

  if(repos.length <= 0) return (
    <div className="fixed flex items-center justify-center w-full h-full z-50">
      <span className="block w-10 h-10 border-[1px] border-gray-600 border-t-gray-400 rounded-full animate-spin z-50"></span>
    </div>
  );

  return (
    <div onContextMenu={(e) => e.preventDefault()} className="lg:w-2/3 w-full h-full flex flex-col items-center p-4 gap-5 other_anim">
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
              <div className="skill">Node.JS</div>
              <div className="skill">TypeScript</div>
              <div className="skill">Nuxt.JS</div>
              <div className="skill">React</div>
              <div className="skill">TailwindCSS</div>
              <div className="skill">C++</div>
              <div className="skill">C</div>
            </div>
        </div>
        <div className="w-full flex flex-col gap-2 py-4">
            <span className="text-2xl">My open source projects.</span>
            <div className="w-full flex flex-col lg:flex-row flex-wrap gap-5">
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
        <Link className="fixed bottom-4 right-4 ic bg-gray-600 hover:bg-gray-400 rounded-full py-2 px-3" to="/"><i class="fa-solid fa-backward"></i></Link>
    </div>
  )
}

export default More;
