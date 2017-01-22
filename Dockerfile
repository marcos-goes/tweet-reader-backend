FROM ubuntu:16.04

MAINTAINER Marcos Goes <mpsgoes@gmail.com>

# Primeiro de tudo eu troco pra um Mirror mais proximo pra ser mais rapido
RUN sed -i 's/archive.ubuntu.com/ubuntu-archive.locaweb.com.br/g' /etc/apt/sources.list

# Instala requerimentos pro "add-apt-repository" 
RUN apt-get update && apt-get install -y software-properties-common

# Sets language to UTF8 : this works in pretty much all cases 
#ENV LANG en_US.UTF-8 
#RUN locale-gen $LANG

# Instala/Configura JDK Java 8
RUN add-apt-repository -y ppa:openjdk-r/ppa
RUN apt-get update && apt-get install -y openjdk-8-jdk
ENV JAVA_HOME /usr/lib/jvm/java-8-openjdk-amd64/
RUN export JAVA_HOME

# Instala o Maven
RUN apt-get install -y maven

# Instala o Git
RUN apt-get install -y git

# Instala o Unzip
RUN apt-get install -y unzip

# Clona repositorio do Github e faz a construcao pelo Maven
RUN cd / && git clone https://github.com/marcos-goes/tweet-reader-backend.git
RUN cd tweet-reader-backend/ && mvn clean install

# Baixa/Instala/Configura Wildfly 10
RUN apt-get install -y wget
RUN cd /opt && wget http://download.jboss.org/wildfly/10.1.0.Final/wildfly-10.1.0.Final.tar.gz
RUN cd /opt && tar xvf wildfly-10.1.0.Final.tar.gz && rm wildfly-10.1.0.Final.tar.gz
RUN ln -s /opt/wildfly-10.1.0.Final /opt/wildfly
ENV JBOSS_HOME /opt/wildfly
RUN $JBOSS_HOME/bin/add-user.sh admin admin123! --silent

# Baixa/Instala/Configura Apiman
RUN cd /opt && wget http://downloads.jboss.org/apiman/1.2.9.Final/apiman-distro-wildfly10-1.2.9.Final-overlay.zip
RUN cd /opt && unzip -o /opt/apiman-distro-wildfly10-1.2.9.Final-overlay.zip -d /opt/wildfly/ && rm apiman-distro-wildfly10-1.2.9.Final-overlay.zip

# Prepara deploy da aplicacao Java
RUN cp /tweet-reader-backend/target/tweet-reader-backend.war $JBOSS_HOME/standalone/deployments/

#ENTRYPOINT ["/opt/jboss/wildfly/bin/standalone.sh", "-b", "0.0.0.0", "-bmanagement", "0.0.0.0", "-c", "standalone-apiman.xml"]

# Expoe portas - Aplicacao, Console e Debug
EXPOSE 8080
EXPOSE 9990
EXPOSE 8787

CMD ["/opt/wildfly/bin/standalone.sh", "-b", "0.0.0.0", "-bmanagement", "0.0.0.0", "-c", "standalone-apiman.xml", "--debug"]


# Para iniciar o container:
# docker run -it --rm -p 8080:8080 -p 9990:9990 -p 8787:8787 mpsgoes/tweet-reader

# Para acessar a interface web:
# http://localhost:8080/tweet-reader