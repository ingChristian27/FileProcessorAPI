const getFiles = async () => {
  const files = [
    { name: 'mockfile1', size: 100 },
    { name: 'mockfile2', size: 200 },
  ];
  return { response: { files } };
};

export default getFiles;
