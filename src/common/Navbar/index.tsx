import { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { BiHome, BiSearch } from "react-icons/bi";
import { CgAbstract } from "react-icons/cg";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

import { classNames } from "../../utils";
import { useAppDispatch, useAppSelector } from "../../utils/hooks/reducer";

import { ROUTES } from "../../router/webRoutes";
import { setMode } from "../../store/reducers/theme";

const Navbar = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const themeMode = useAppSelector((state) => state.theme.mode);

  if (themeMode === "dark") document.documentElement.classList.add("dark");
  else if (themeMode === "light")
    document.documentElement.classList.remove("dark");

  const [searchInput, setSearchInput] = useState("");
  const [showNavBg, setShowNavBg] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [searchClicked, setSearchClicked] = useState(false);
  const [showSuggestion, setShowSuggestion] = useState<boolean>(false);
  const debounceTimeout = useRef<number | null>(null);

  useEffect(() => {
    const handleNavbarEffect = () => {
      if (window.scrollY > 30) {
        setShowNavBg(true);
      } else {
        setShowNavBg(false);
      }
    };

    window.addEventListener("scroll", handleNavbarEffect);

    return () => {
      window.removeEventListener("scroll", handleNavbarEffect);
    };
  }, []);

  const debounce = (func: Function, delay: number) => {
    let timer: any;
    return function (this: any, ...args: any[]) {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), delay);
    };
  };
  const searchPhotos = () => {
    navigate("/search?query=" + searchInput);
  };

  useEffect(() => {
    if (searchClicked) {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
      debounceTimeout.current = window.setTimeout(() => {
        searchPhotos();
      }, 1000);
    }
    setSearchClicked(false);
  }, [searchClicked]);

  const debounceFetchSuggestions = useRef(
    debounce(async (value: string) => {
      try {
        const response = await fetch(
          `https://api.datamuse.com/sug?s=${value}&max=5`
        );
        const data = await response.json();
        const suggestions = data.map((item: any) => item.word);
        setSuggestions(suggestions);
        setShowSuggestion(true);
      } catch (error) {
        console.error(error);
      }
    }, 500)
  ).current;

  const handleInputChange = (value: any) => {
    setSearchInput(value);
    debounceFetchSuggestions(value);
  };

  const handleSuggestionClick = (value: any) => {
    setSearchInput(value);
    setShowSuggestion(false);
    setSearchClicked(true);
  };
  const handleSearchClick = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearchClicked(true);
    setShowSuggestion(false);
  };
  const desktopInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside1 = (event: MouseEvent) => {
      if (
        desktopInputRef.current &&
        !desktopInputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestion(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside1);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside1);
    };
  }, []);
  return (
    <div ref={desktopInputRef}
      className={classNames(
        showNavBg
          ? "dark:backdrop-brightness-50 dark:bg-transparent dark:bg-opacity-100 bg-gray-300 bg-opacity-75 shadow-lg"
          : "dark:backdrop-brightness-100 dark:bg-opacity-100",
        "sticky md:h-[90px] sm:h-[120px] h-[95px] top-0 z-30 backdrop-blur-md transition-[background] duration-500 px-4 md:py-5 py-3"
      )}
    >
      <div
        className={classNames(
          "max-w-[1400px] mx-auto flex justify-between items-start"
        )}
      >
        <Link to={ROUTES.HOME.pathName}>
          <p className="flex md:gap-3 gap-1 justify-center mt-2">
            <CgAbstract className="md:h-8 md:w-8 h-6 w-6" />
            <span className="font-satisfy sm:text-3xl text-xl">
              Random Shots
            </span>
          </p>
        </Link>
        <form onSubmit={handleSearchClick} className="gap-6">
          <div ref={desktopInputRef} className="flex gap-6 justify-center items-start">
            <Link to={ROUTES.HOME.pathName}>
              <BiHome className="h-7 w-7 cursor-pointer md:block hidden mt-2" />
            </Link>
            <div className="flex flex-col w-full">
              <input
              ref={desktopInputRef}
                value={searchInput}
                onChange={(e) => handleInputChange(e.target.value)}
                onFocus={() => setShowSuggestion(true)}
                className={classNames(
                  showSuggestion
                    ? "rounded-br-none rounded-bl-none"
                    : "rounded-md",
                  `bg-gray-300 focus:outline-none md:block hidden px-3 py-2 rounded-md placeholder:text-center dark:text-gray-700 dark:placeholder:text-gray-500 placeholder:text-gray-700 w-72`
                )}
                placeholder="Search"
              />
            <div
            className={classNames(
              showSuggestion
                ? "rounded-tr-none rounded-tl-none md:block hidden border-t"
                : "rounded-md",
              `bg-gray-300 md:block hidden px-3 rounded-md dark:text-gray-700`
            )}
          >
            { showSuggestion && (
              <div ref={desktopInputRef}>
                {suggestions.map((suggestion) => (
                  <div
                    className="my-2 cursor-pointer md:block hidden hover:underline transition-all duration-[1000ms]"
                    key={suggestion}
                    onClick={() => {
                      setSearchInput(suggestion)
                      handleSuggestionClick(suggestion)}}
                  >
                    {suggestion}
                  </div>
                ))}
              </div>
            )}
          </div>
            </div>
            <div
              className="flex justify-center items-center mt-2"
              ref={desktopInputRef}
            >
              <button disabled={!searchInput} type="submit">
                <BiSearch className="h-7 w-7 md:block hidden" />
              </button>
            </div>
          </div>
        </form>
        <div className="flex gap-5 h-min mt-2">
          {themeMode === "dark" ? (
            <MdOutlineDarkMode
              className="h-7 w-7 cursor-pointer"
              onClick={() => dispatch(setMode("light"))}
            />
          ) : (
            <MdOutlineLightMode
              className="h-7 w-7 cursor-pointer"
              onClick={() => dispatch(setMode("dark"))}
            />
          )}
          <img
            className="h-7 w-7 rounded-full object-cover"
            src="https://www.financialexpress.com/wp-content/uploads/2021/09/MyGlamm-With-Shraddha-Kapoor.jpeg"
            alt=""
          />
        </div>
      </div>
      <form
        onSubmit={handleSearchClick}
        className="flex justify-between items-start gap-2 mt-2">
        <div className="flex flex-col w-full">
          <input
        
            value={searchInput}
            onChange={(e) => handleInputChange(e.target.value)}
            onFocus={() => setShowSuggestion(true)}
            className={classNames(
              showSuggestion ? "rounded-br-none rounded-bl-none" : "rounded-md",
              `bg-gray-300 focus:outline-none md:hidden block px-3 py-1 rounded-md placeholder:text-center dark:text-gray-700 dark:placeholder:text-gray-500 placeholder:text-gray-700 w-full`
            )}
            placeholder="Search"
          />
          <div 
            className={classNames(
              showSuggestion
                ? "rounded-tr-none rounded-tl-none border-t"
                : "rounded-md",
              `bg-gray-300 md:hidden block px-3 rounded-md placeholder:text-center dark:text-gray-700`
            )}
          >
            {showSuggestion && (
              <div >
                {suggestions.map((suggestion) => (
                  <div
                    className="my-2 cursor-pointer hover:underline transition-all duration-[1000ms]"
                    key={suggestion}
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div  className="flex justify-center items-center" >
          <button disabled={!searchInput} type="submit">
            <BiSearch className="md:h-7 md:w-7 h-6 w-6 md:hidden block mt-1" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Navbar;
