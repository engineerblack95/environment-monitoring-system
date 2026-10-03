function errorHandler(err, req, res, next) {
  console.error('❌ Error:', err.message);
  console.error(err.stack);

  if (err.code === 'ECONNREFUSED') {
    return res.status(503).json({ 
      error: 'Database unavailable' 
    });
  }

  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
  });
}

module.exports = errorHandler;