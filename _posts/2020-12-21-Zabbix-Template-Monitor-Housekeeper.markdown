---
title: "Zabbix: Template Zabbix Monitor Housekeeper"
layout: post
date: 2020-12-21 17:10
tag: zabbix
image: 
headerImage: true
projects: true
hidden: true # don't count this post in blog pagination
description: "Zabbix: Template Zabbix Monitor Housekeeper"
category: project
author: Bernardo
externalLink: false
---

# Zabbix-Monitor-Housekeeper
![Logo](https://github.com/bernardolankheet/Zabbix-Monitor-Housekeeper/blob/main/img/zabbix_logo.png?raw=true)

Project Name: Zabbix-Monitor-Housekeeper\
Author: Bernardo Lankheet\
Telegram: [@bernardolankheet](https://t.me/bernardolankheet)\
Description BR: Coleta de métricas sobre a execução do Housekeeper. *Não se aplica em ambientes que utiliza particionamento de tabelas ou outras rotinas para manutenção do banco de dados.*\
Description EN: Collect Metrics on Housekeeper Execution. *It does not apply in environments that use table partitioning or other routines for maintaining the bank.*\
OBS EN: Based on projet Diego Cavalcante [ZAKEEP.zabbix.housekeeper.monitor](https://github.com/suportecavalcante/zabbix.templates/tree/master/linux/ZAKEEP.zabbix.housekeeper.monitor)\
OBS BR: Ideia retirada do projeto do Diego Cavalcante [ZAKEEP.zabbix.housekeeper.monitor](https://github.com/suportecavalcante/zabbix.templates/tree/master/linux/ZAKEEP.zabbix.housekeeper.monitor)

## Usage
EN: Import your Template into Zabbix, link to the Host "Zabbix server" and wait for the items to be collected, collection is carried out according to the housekeeping schedule. Image 03

BR: Importe seu Template para o Zabbix, vincula o template ao Host "Zabbix server" e aguarde os itens serem coletados, a coleta é realizada conforme a programação do housekeeping. Imagem 03

## How it works?
EN: Whenever housekeeping is performed by zabbix-server, a line is generated containing the information deleted from zabbix_server.log. The item Syslog Housekeeping, of the log type, captures the information via active checking and the other dependent items are pre-filled according to parent item information.

BR: Sempre que a manutenção é realizada pelo zabbix-server, uma linha é gerada contendo as informações excluídas do zabbix_server.log. O item Syslog Housekeeping, do tipo log, captura as informações por meio de verificação ativa e os demais itens dependentes são pré-preenchidos de acordo com as informações do item pai.

## Macros
{$ PATHLOG} - /var/log/zabbix/zabbix_server.log - Path to zabbix_server.log\
{$ REGEXLOG} -. * Deleted. * [0-9] + hist \ /trends.* - Regex to capture the line for housekepping inside the log

## Homolog
* Zabbix 4.4
* Zabbix 5.0.6

## Templates
* Template Housekeeping Metrics-EN-US - English version
* Template Housekeeping Metricas - PT-BR

# ° SCREENSHOTS

![Grafico1](https://github.com/bernardolankheet/Zabbix-Monitor-Housekeeper/blob/main/img/01.jpg?raw=true)
![Grafico2](https://github.com/bernardolankheet/Zabbix-Monitor-Housekeeper/blob/main/img/02.jpg?raw=true)
![Grafico3](https://github.com/bernardolankheet/Zabbix-Monitor-Housekeeper/blob/main/img/03.jpg?raw=true)
![Grafico4](https://github.com/bernardolankheet/Zabbix-Monitor-Housekeeper/blob/main/img/04.jpg?raw=true)


---