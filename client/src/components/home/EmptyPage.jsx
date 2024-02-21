const EmptyPage = () => {
  return (
    <div className="py-6 px-[60px]">
      <div className="border border-primary-foreground p-4 rounded flex flex-col gap-4">
        <h1 className="text-2xl font-medium">Hello, Varshith.</h1>
        <p className="text-cancelText flex flex-col">
          <span>Looks like you have not started anything!</span>
          <span>Start by creating a project</span>
        </p>
      </div>
    </div>
  );
};

export default EmptyPage;
