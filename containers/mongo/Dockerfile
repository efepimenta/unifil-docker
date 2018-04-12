FROM mongo:3.4
LABEL mantainer="Fabio Pimenta <fabio@ispti.com.br>"

ENV AUTH yes
ENV STORAGE_ENGINE wiredTiger
ENV JOURNALING yes

ADD run.sh /run.sh
ADD set_mongodb_password.sh /set_mongodb_password.sh

CMD ["/run.sh"]