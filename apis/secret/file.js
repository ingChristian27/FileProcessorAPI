const getFile = async () => {
  const file = { name: 'mockfile1', size: 100 };
  return { response: { file } };
};

export default getFile;
