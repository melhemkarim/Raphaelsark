export default function TopBar() {
  return (
    <header className="top">
      <a className="logo" href="#top" aria-label="Raphael Sark, back to top">
        Raphael
      </a>
      <nav aria-label="Main">
        <a href="#tiktok">TikTok</a>
        <a href="#moteur">El moteur</a>
        <a href="#mom">Mom translator</a>
        <a href="#quiz">Family quiz</a>
        <a href="#iris">Iris</a>
        <a href="#brand">Brand</a>
        <a className="mini" href="#collab">
          Collab
        </a>
      </nav>
    </header>
  );
}
