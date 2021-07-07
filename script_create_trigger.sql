CREATE OR REPLACE FUNCTION process_servico_audit() RETURNS TRIGGER AS $emp_audit$
    BEGIN
        --
        -- Create a row in emp_audit to reflect the operation performed on emp,
        -- make use of the special variable TG_OP to work out the operation.
        --
        IF (TG_OP = 'DELETE') THEN
            INSERT INTO ms_auditoria(acao,tabela, usuario, data_acao, antes, depois) values ('delete', 'ms_servico', CURRENT_USER, NOW(),CONCAT (OLD.preco, ' | ', OLD.carro_id, ' | ', OLD.tipo_servico_id), null); 
            RETURN OLD;
        ELSIF (TG_OP = 'UPDATE') THEN
            INSERT INTO ms_auditoria(acao,tabela, usuario, data_acao, antes, depois) values ('update', 'ms_servico', CURRENT_USER, NOW(),CONCAT (OLD.preco, ' | ', OLD.carro_id, ' | ', OLD.tipo_servico_id), CONCAT (NEW.preco, ' | ', NEW.carro_id, ' | ', NEW.tipo_servico_id)); 
            
			RETURN NEW;
        ELSIF (TG_OP = 'INSERT') THEN
			INSERT INTO ms_auditoria(acao,tabela, usuario, data_acao, antes, depois) values ('insert', 'ms_servico', CURRENT_USER, NOW(),null, CONCAT (NEW.preco, ' | ', NEW.carro_id, ' | ', NEW.tipo_servico_id)); 
			
            RETURN NEW;
        END IF;
        RETURN NULL; -- result is ignored since this is an AFTER trigger
    END;
$emp_audit$ LANGUAGE plpgsql;

CREATE TRIGGER manuserv_audit_INS AFTER INSERT OR UPDATE OR DELETE 
ON ms_servico
FOR EACH ROW EXECUTE PROCEDURE process_servico_audit();


