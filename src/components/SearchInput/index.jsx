import SearchIcon from "../../assets/search-icon.svg";
import "./searchInput.css";
export default function SearchInput({ setConsultaPesquisa }) {
  const handleInputChange = (e) => {
    setConsultaPesquisa(e.target.value);
  };
  return (
    <div className="searchInputContainer">
      <input className="searchInput" type="text" placeholder="Pesquisar" onChange={handleInputChange} />
      <img className="searchIcon" src={SearchIcon} alt="pesquisar" />
    </div>
  );
}
