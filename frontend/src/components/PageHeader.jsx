function PageHeader({ eyebrow, title, description }) {
  return (
    <section className="page-header">
      <div className="content">
        <p className="eyebrow">{eyebrow}</p>

        <h1>{title}</h1>

        <p className="page-description">
          {description}
        </p>
      </div>
    </section>
  );
}

export default PageHeader;