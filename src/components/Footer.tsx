const Footer = () => {
  return (
    <footer className="bg-github-dark-bg-secondary border-t border-github-dark-border py-4">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <p className="text-github-dark-text-secondary text-sm">
          Created by{" "}
          <a
            href="https://m-shintaro.github.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-github-dark-accent hover:underline"
          >
            @xyzmiku
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
