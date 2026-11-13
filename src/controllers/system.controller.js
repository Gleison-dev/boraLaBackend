const status = async (req, res) => {
  try {
    return res.status(201).json({ message: "Hello, world!" });
  } catch (error) {
    return res.status(500).json({ message: "Servidor não está rodando!" });
  }
};

export { status };
