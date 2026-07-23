import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Typography, IconButton } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { motion, AnimatePresence } from 'framer-motion';

// Champ d'upload avec drag & drop, preview image et message de succès (§6.5, étape 3)
function DocumentUploadField({ label, required, file, onFileChange, accept = { 'image/*': [], 'application/pdf': [] } }) {
  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        onFileChange(acceptedFiles[0]);
      }
    },
    [onFileChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024, // 5 Mo
  });

  const isImage = file && file.type && file.type.startsWith('image/');
  const previewUrl = isImage ? URL.createObjectURL(file) : null;

  return (
    <Box>
      <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
        {label} {required && <Box component="span" sx={{ color: 'primary.main' }}>(*)</Box>}
      </Typography>

      <Box
        {...getRootProps()}
        sx={{
          border: '2px dashed',
          borderColor: file ? '#2e7d32' : isDragActive ? 'primary.main' : '#ccc',
          bgcolor: file ? '#eef7ee' : isDragActive ? '#fff5ec' : '#fafafa',
          borderRadius: 1,
          p: 2.5,
          textAlign: 'center',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        }}
      >
        <input {...getInputProps()} />

        <AnimatePresence mode="wait">
          {file ? (
            <motion.div
              key="uploaded"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5 }}>
                {previewUrl ? (
                  <Box
                    component="img"
                    src={previewUrl}
                    alt={label}
                    sx={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 1 }}
                  />
                ) : (
                  <InsertDriveFileIcon sx={{ fontSize: 36, color: '#2e7d32' }} />
                )}
                <Box sx={{ textAlign: 'left' }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }} noWrap>
                    {file.name}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <CheckCircleIcon sx={{ fontSize: 14, color: '#2e7d32' }} />
                    <Typography variant="caption" sx={{ color: '#2e7d32' }}>
                      Fichier prêt
                    </Typography>
                  </Box>
                </Box>
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    onFileChange(null);
                  }}
                >
                  <CloseIcon sx={{ fontSize: 18 }} />
                </IconButton>
              </Box>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <CloudUploadIcon sx={{ fontSize: 32, color: 'text.secondary', mb: 0.5 }} />
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Glissez un fichier ici ou cliquez pour sélectionner
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                PDF, JPG, PNG — 5 Mo max
              </Typography>
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    </Box>
  );
}

export default DocumentUploadField;