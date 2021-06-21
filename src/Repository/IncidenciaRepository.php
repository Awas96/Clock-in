<?php

namespace App\Repository;

use App\Entity\Incidencia;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Incidencia|null find($id, $lockMode = null, $lockVersion = null)
 * @method Incidencia|null findOneBy(array $criteria, array $orderBy = null)
 * @method Incidencia[]    findAll()
 * @method Incidencia[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class IncidenciaRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Incidencia::class);
    }

    // /**
    //  * @return Incidencia[] Returns an array of Incidencia objects
    //  */

    public function findByEvento($value)
    {
        return $this->createQueryBuilder('i')
            ->andWhere('i.evento = :val')
            ->setParameter('val', $value)
            ->orderBy('i.id', 'DESC')
            ->getQuery()
            ->getResult();
    }

    public function findByEventoAndUsuario($usuario)
    {
        return $this->createQueryBuilder('i')
            ->andWhere('i.estado = 1')
            ->andWhere('e.usuario = :user')
            ->leftJoin("i.evento", 'e')
            ->setParameter('user', $usuario)
            ->orderBy('i.id', 'DESC')
            ->getQuery()
            ->getResult();
    }


}
