import Proxy from '../../../src/app/operations/update';

import EmbedEntity from '../../../src/app/entities/embed';
import FileEntity from '../../../src/app/entities/file';
import GridEntity from '../../../src/app/entities/grid';
import GridColumnEntity from '../../../src/app/entities/grid_column';
import ImageEntity from '../../../src/app/entities/image';
import ListEntity from '../../../src/app/entities/list';
import ParagraphEntity from '../../../src/app/entities/paragraph';
import RootContainerEntity from '../../../src/app/entities/root_container';
import SubstrateEntity from '../../../src/app/entities/substrate';
import TableEntity from '../../../src/app/entities/table';

describe('Update Operation Proxy', () => {
  describe('returns Update', () => {
    it('Embed instance', () => {
      let entity = new EmbedEntity();
      let proxy = new Proxy(entity, {});
      expect(proxy.operation.type).to.be.equal('update');
    });

    it('File instance', () => {
      let entity = new FileEntity();
      let proxy = new Proxy(entity, {});
      expect(proxy.operation.type).to.be.equal('update');
    });

    it('Grid instance', () => {
      let entity = new GridEntity();
      let proxy = new Proxy(entity, {});
      expect(proxy.operation.type).to.be.equal('update');
    });

    it('GridColumn instance', () => {
      let entity = new GridColumnEntity();
      let proxy = new Proxy(entity, {});
      expect(proxy.operation.type).to.be.equal('update');
    });

    it('Image instance', () => {
      let entity = new ImageEntity();
      let proxy = new Proxy(entity, {});
      expect(proxy.operation.type).to.be.equal('update');
    });

    it('List instance', () => {
      let entity = new ListEntity();
      let proxy = new Proxy(entity, {});
      expect(proxy.operation.type).to.be.equal('update');
    });

    it('Paragraph instance', () => {
      let entity = new ParagraphEntity();
      let proxy = new Proxy(entity, {});
      expect(proxy.operation.type).to.be.equal('update');
    });

    it('RootContainer instance', () => {
      let entity = new RootContainerEntity();
      let proxy = new Proxy(entity, {});
      expect(proxy.operation.type).to.be.equal('update');
    });

    it('SubstrateEntity instance', () => {
      let entity = new SubstrateEntity();
      let proxy = new Proxy(entity, {});
      expect(proxy.operation.type).to.be.equal('update');
    });

    it('TableEntity instance', () => {
      let entity = new TableEntity();
      let proxy = new Proxy(entity, {});
      expect(proxy.operation.type).to.be.equal('update');
    });
  });

  describe('throw', () => {
    it('error', () => {
      let entity = function() {};
      expect(function() { new Proxy(entity, {}); }).to.throw('Cannot find concrete operation class!');
    });
  });
});
