from storages.backends.ftp import FTPStorage

class MediaStorage(FTPStorage):
    def __init__(self, *args, **kwargs):
        kwargs['host'] = "185.234.114.50"
        kwargs['username'] = "eraco237"
        kwargs['password'] = "Erasoft04"
        kwargs['base_url'] = "https://fermi.kz/media/"
        kwargs['location'] = "/httpdocs/media"
        super().__init__(*args, **kwargs)