from io import RawIOBase

class UnseekableStream(RawIOBase):
    def __init__(self):
        self._buffer = b''

    def writable(self):
        return True

    def write(self, b):
        if self.closed:
            raise ValueError('Stream was closed!')
        self._buffer += b
        return len(b)

    def get(self):
        chunk = self._buffer
        self._buffer = b''
        return chunk
