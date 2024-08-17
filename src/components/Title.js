const Title = ({ className, children }) => (
  <h1 className={`text-2xl font-bold ${className ? className : ''}`}>
    {children}
  </h1>
);

export default Title;
